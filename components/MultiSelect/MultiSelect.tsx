import { FC, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { MultiSelectPropType } from "./multiselect.types";
import { CheckBox, MainLabel, MainView, MenuContainer, MultiSelectContainer, RowLabel } from "./multiselect.elements";

const MultiSelect: FC<MultiSelectPropType> = ({
  label,
  options,
  selectedItems,
  setSelectedItems,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => setIsOpen(prevState => !prevState);

  const handleCheckboxChange = (value: string) => {
    const newList = selectedItems.includes(value)
      ? selectedItems.filter(item => item !== value)
      : [...selectedItems, value]
    setSelectedItems(newList);
  };

  return (
    <MultiSelectContainer className={className}>
      <MainView onClick={toggleSelect} >
        <MainLabel>{label}</MainLabel>
        <IoChevronDown className="size-4" />
      </MainView>
      {isOpen && (
        <MenuContainer>
          {options.map((option) => (
            <RowLabel key={option}>
              <CheckBox
                type="checkbox"
                checked={selectedItems.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </RowLabel>
          ))}
        </MenuContainer>
      )}
    </MultiSelectContainer>
  );
};

export default MultiSelect;
