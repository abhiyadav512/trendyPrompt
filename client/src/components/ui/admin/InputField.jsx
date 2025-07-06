export const InputField = ({ label, name, value, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-white/20"
            placeholder={placeholder}
            required
        />
    </div>
);
