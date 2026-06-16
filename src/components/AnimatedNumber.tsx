"use client";

import { useEffect, useState, useRef } from "react";

export function AnimatedNumber({ value }: { value: string | number }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const stringValue = String(value);
    // Parse value like "1200+", "4.9", "$500"
    const match = stringValue.match(/^([^0-9.-]*)([0-9.-]+)(.*)$/);
    if (!match) {
      setDisplayValue(stringValue);
      return;
    }
    
    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];
    const targetNum = parseFloat(numStr);
    
    if (isNaN(targetNum)) {
      setDisplayValue(stringValue);
      return;
    }
    
    const hasDecimal = numStr.includes(".");
    const decimalPlaces = hasDecimal ? numStr.split(".")[1].length : 0;
    
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out function (easeOutQuart)
      const easePercentage = 1 - Math.pow(1 - percentage, 4);
      const currentNum = targetNum * easePercentage;
      
      const formattedNum = currentNum.toFixed(decimalPlaces);
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);
      
      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(stringValue); // Ensure exactly target at the end
      }
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value]);
  
  return <span ref={ref}>{displayValue}</span>;
}
