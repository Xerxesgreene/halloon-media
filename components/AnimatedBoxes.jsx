'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedBoxes() {
  const [enabled, setEnabled] = useState(false);
  const timeoutRef = useRef(null);
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        setEnabled(true);
      });
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setEnabled(true);
      }, 300);
    }

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { 
      alpha: true,
      antialias: true,
      premultipliedAlpha: false 
    });

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader with cream and forest green blend
    const fragmentShaderSource = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      varying vec2 vUv;

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        uv += (uMouse - vec2(0.5)) * 0.15;
        
        float d = -uTime * 0.4;
        float a = 0.0;
        
        for (float i = 0.0; i < 8.0; ++i) {
          a += cos(i - d - a * uv.x);
          d += sin(uv.y * i + a);
        }
        d += uTime * 0.4;
        
        vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
        
        // Cream and forest green blend
        vec3 cream = vec3(0.96, 0.94, 0.86);        // Dense cream color
        vec3 forestGreen = vec3(0.25, 0.55, 0.40);  // Darker forest green
        vec3 mintGreen = vec3(0.55, 0.75, 0.65);    // Adjusted mint green (transition color)
        
        // Create smooth gradient blending between cream and forest green
        // Increased cream presence by adjusting blend factor
        float blend = cos(col.x * 3.14159 + d) * 0.5 + 0.5;
        blend = pow(blend, 1.3); // Make cream more dominant
        vec3 color1 = mix(cream, mintGreen, blend * 0.7);
        vec3 color2 = mix(mintGreen, forestGreen, blend);
        
        col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
        col = mix(color1, color2, col.y * 0.8); // More cream overall
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Create shaders
    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Create program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create buffer
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const uMouseLocation = gl.getUniformLocation(program, 'uMouse');

    // Resize function
    function resize() {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      }
    }

    // Mouse move handler
    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    resize();

    // Animation loop
    function animate(time) {
      time *= 0.001; // Convert to seconds

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLocation, time);
      gl.uniform2f(uMouseLocation, mousePos.current.x, mousePos.current.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}