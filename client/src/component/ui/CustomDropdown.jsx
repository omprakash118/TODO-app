import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({
  options = [],
  value = "",
  onChange,
  placeholder = "Select an option...",
  label = "",
  icon: Icon,
  error = "",
  disabled = false,
  className = "",
  optionIcon: OptionIcon,
  getOptionLabel = (option) => option.label || option.title || option,
  getOptionValue = (option) => option.value || option._id || option,
  getOptionIcon = (option) => option.icon,
  getOptionColor = (option) => option.color,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter(option => {
    const label = getOptionLabel(option);
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedOption = options.find(option => getOptionValue(option) === value);

  const handleSelect = (option) => {
    const optionValue = getOptionValue(option);
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-left ${
          error
            ? "border-red-300 bg-red-50 text-red-900"
            : "border-gray-200 bg-white hover:border-gray-300 text-gray-900"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {selectedOption && getOptionIcon && (
              <div className="mr-3">
                {getOptionIcon(selectedOption)}
              </div>
            )}
            <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
              {selectedOption ? getOptionLabel(selectedOption) : placeholder}
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          {options.length > 5 && (
            <div className="p-3 border-b border-gray-100">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const optionValue = getOptionValue(option);
                const optionLabel = getOptionLabel(option);
                const isSelected = optionValue === value;
                const optionColor = getOptionColor(option);

                return (
                  <button
                    key={optionValue}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between ${
                      isSelected ? "bg-blue-50 text-blue-900" : "text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      {getOptionIcon && (
                        <div className="mr-3">
                          {getOptionIcon(option)}
                        </div>
                      )}
                      {optionColor && (
                        <div
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: optionColor }}
                        />
                      )}
                      <span className="text-sm font-medium">{optionLabel}</span>
                    </div>
                    {isSelected && (
                      <Check size={16} className="text-blue-600" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomDropdown;
