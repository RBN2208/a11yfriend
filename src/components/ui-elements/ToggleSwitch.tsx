'use client';

type ToggleSwitchProps = {
  isLogin: boolean;
  callbackAction: () => void;
}

export default function ToggleSwitch({ isLogin, callbackAction }: ToggleSwitchProps) {
  const toggleForm = () => {
    callbackAction();
  };

  return (
    <div className="p-6 pb-0">
      <div className="flex justify-center mb-8">
        <div className="relative bg-gray-200 w-64 h-10 m-2 rounded-full flex items-center">
          <div
            className={`absolute top-0 left-0 w-32 h-10 bg-blue-900 rounded-full transition-transform duration-300 ${isLogin ? 'translate-x-0' : 'translate-x-32'}`}
          ></div>
          <button
            className={`w-32 h-10 z-10 font-medium transition-colors rounded-full duration-300 ${isLogin ? 'text-white hover:bg-blue-700 ' : 'text-gray-700 hover:bg-gray-300 '}`}
            onClick={() => isLogin || toggleForm()}
          >
            Login
          </button>
          <button
            className={`w-32 h-10 z-10 font-medium transition-colors rounded-full duration-300 ${!isLogin ? 'text-white hover:bg-blue-700 ' : 'text-gray-700 hover:bg-gray-300 '}`}
            onClick={() => !isLogin || toggleForm()}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
