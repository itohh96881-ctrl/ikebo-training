import { useState, useRef, useCallback, useEffect } from 'react';

interface UseAudioRecorderReturn {
    isRecording: boolean;
    recordingTime: number; // in seconds
    audioUrl: string | null;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    clearRecording: () => void;
    error: string | null;
    analyser: AnalyserNode | null;
}

export const useAudioRecorder = (): UseAudioRecorderReturn => {
    const [isRecording, setIsRecording] = useState(false);
    const [_, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    useEffect(() => {
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    const startTimer = useCallback(() => {
        setRecordingTime(0);
        timerRef.current = window.setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startRecording = useCallback(async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Audio Context Setup for Visualization
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;

            // Safe resume if suspended
            if (ctx && ctx.state === 'suspended') {
                await ctx.resume();
            }

            if (ctx) {
                const analyserNode = ctx.createAnalyser();
                analyserNode.fftSize = 256;
                const source = ctx.createMediaStreamSource(stream);
                source.connect(analyserNode);

                sourceRef.current = source;
                setAnalyser(analyserNode);
            }

            // Recorder Setup
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
                stopTimer();

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());

                // Cleanup Audio Nodes
                if (sourceRef.current) {
                    sourceRef.current.disconnect();
                    sourceRef.current = null;
                }
                setAnalyser(null);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            startTimer();
        } catch (err) {
            console.error('Error accessing microphone:', err);
            setError('マイクへのアクセスが拒否されました。設定を確認してください。');
        }
    }, [startTimer, stopTimer]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }, []);

    const clearRecording = useCallback(() => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
            setAudioUrl(null);
        }
        setRecordingTime(0);
    }, [audioUrl]);

    return {
        isRecording,
        recordingTime,
        audioUrl,
        startRecording,
        stopRecording,
        clearRecording,
        error,
        analyser
    };
};
