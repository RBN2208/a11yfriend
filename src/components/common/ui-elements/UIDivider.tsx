interface UIDividerProps {
    label?: string;
}

export function UIDivider(props: UIDividerProps) {
    return (
        <div className="flex items-center w-full mb-6 mt-10">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            {props.label &&
                <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
                    {props.label}
                </span>
            }
            <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>
    );
}