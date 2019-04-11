import React, {useState, useRef, useEffect} from 'react';

export default function EditTextInput({ className, size, init, onBlur, selectAll, style }) {
  let [newValue, setNewValue] = useState(init);
  let ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      if (selectAll) {
        ref.current.select();
      }
    }
  }, []);
  return (
    <input
      ref={ref}
      type="text"
      className={className}
      size={size}
      style={style}
      value={newValue}
      onChange={e => setNewValue(e.target.value)}
      onBlur={() => onBlur(newValue)}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          onBlur(newValue);
        }
      }}
    />
  );
}
