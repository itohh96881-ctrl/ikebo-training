import React from 'react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { Button } from './Button';
import { Visualizer } from './Visualizer';

export const AudioRecorder: React.FC = () => {
    const {
        isRecording,
        recordingTime,
        audioUrl,
        startRecording,
        stopRecording,
        clearRecording,
        error,
        analyser
    } = useAudioRecorder();

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm max-w-md w-full mx-auto text-center">
            <div className="mb-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-200">ボイスレコーダー</h2>

                {isRecording && (
                    <div className="py-4">
                        <Visualizer analyser={analyser} />
                    </div>
                )}

                <div className="text-4xl font-mono text-indigo-400 font-bold tabular-nums">
                    {formatTime(recordingTime)}
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {!audioUrl ? (
                <div className="flex justify-center">
                    {!isRecording ? (
                        <Button
                            size="lg"
                            onClick={startRecording}
                            className="rounded-full w-16 h-16 !p-0 grid place-items-center bg-red-500 hover:bg-red-600 shadow-red-500/30 transition-transform active:scale-95"
                        >
                            <div className="w-6 h-6 bg-white rounded-full"></div>
                        </Button>
                    ) : (
                        <Button
                            size="lg"
                            onClick={stopRecording}
                            className="rounded-full w-16 h-16 !p-0 grid place-items-center bg-slate-700 hover:bg-slate-600"
                        >
                            <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
                        </Button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <audio controls src={audioUrl} className="w-full" />
                    <div className="flex gap-2 justify-center">
                        <Button variant="secondary" onClick={clearRecording}>
                            再録音
                        </Button>
                    </div>
                </div>
            )}

            <div className="mt-4 text-sm text-slate-500">
                {isRecording ? '録音中...' : audioUrl ? '録音を確認してください' : 'タップして録音開始'}
            </div>
        </div>
    );
};
