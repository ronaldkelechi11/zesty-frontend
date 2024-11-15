/* eslint-disable react/prop-types */
const InputField = ({ value, placeholder, error, onChange, type, label, dark, ...props }) => {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <label className="font-bold">{label} {props.required ?
        <span className="text-red-500">*</span> : null}</label>
      <input type={type} className={dark ?
        "bg-transparent text-sm border border-white text-white rounded-lg p-3 hover:scale-105 transition-all" :
        "bg-transparent text-sm border border-black text-black rounded-lg p-3 hover:scale-105 transition-all"}
        value={value}
        onChange={onChange}
        placeholder={placeholder} {...props} />
      <div className="text-red-500">{error}</div>
    </div>
  )
}
export default InputField