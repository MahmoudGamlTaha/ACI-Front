interface GlobalLoaderProps {
    message?: string;
}
export default function GlobalLoader({ message }: GlobalLoaderProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-25 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl p-8 flex flex-col items-center space-y-4 max-w-sm mx-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-primary-50 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-700 font-medium text-center">{message || 'جاري التحميل...'}</p>
            </div>
        </div>
    );
}