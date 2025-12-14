import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface TimerProps {
    initialSeconds?: number;
    label?: string;
}

export const Timer: React.FC<TimerProps> = ({ initialSeconds = 60, label = "Timer" }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => {
                setSeconds(s => {
                    if (s <= 1) {
                        setIsActive(false);
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const toggle = () => setIsActive(!isActive);
    const reset = () => {
        setIsActive(false);
        setSeconds(initialSeconds);
    };

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm text-center">
            <h3 className="text-xl font-semibold text-slate-200 mb-4">{label}</h3>
            <div className="text-5xl font-mono font-bold text-indigo-400 mb-6">
                {formatTime(seconds)}
            </div>
            <div className="flex justify-center gap-3">
                <Button onClick={toggle} variant={isActive ? "secondary" : "primary"}>
                    {isActive ? '一時停止' : 'スタート'}
                </Button>
                <Button variant="outline" onClick={reset}>
                    リセット
                </Button>
            </div>
        </div>
    );
};
