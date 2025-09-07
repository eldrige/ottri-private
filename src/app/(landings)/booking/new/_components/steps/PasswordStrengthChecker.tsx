import React from "react";

interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  symbol: boolean;
}

interface PasswordStrengthCheckerProps {
  criteria: PasswordCriteria;
}

const PasswordStrengthChecker: React.FC<PasswordStrengthCheckerProps> = ({
  criteria
}) => {
  const getCriteriaColor = (isValid: boolean) => {
    return isValid ? "text-green-500" : "text-gray-400";
  };

  const getIcon = (isValid: boolean) => {
    return isValid ? (
      <span className="mr-1 text-green-500">✓</span>
    ) : (
      <span className="mr-1 text-gray-400">○</span>
    );
  };

  return (
    <div className="mt-2 text-xs space-y-1">
      <p className="text-gray-600 font-medium mb-1">Password must contain:</p>
      <div className={`flex items-center ${getCriteriaColor(criteria.length)}`}>
        {getIcon(criteria.length)} At least 8 characters
      </div>
      <div
        className={`flex items-center ${getCriteriaColor(criteria.uppercase)}`}
      >
        {getIcon(criteria.uppercase)} At least 1 uppercase letter
      </div>
      <div className={`flex items-center ${getCriteriaColor(criteria.number)}`}>
        {getIcon(criteria.number)} At least 1 number
      </div>
      <div className={`flex items-center ${getCriteriaColor(criteria.symbol)}`}>
        {getIcon(criteria.symbol)} At least 1 special character
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
