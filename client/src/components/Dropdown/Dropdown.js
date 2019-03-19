import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import menu from "../../../assets/svg/menu.svg";

// eslint-disable-next-line react/prop-types
const DropdownView = ({ dropdownOpen, toggle, onDelete }) => {
  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          style={{
            backgroundColor: "#fff",
            border: "none",
            outline: "none"
          }}
        >
          <img src={menu} alt="menu" className="menu" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem onClick={onDelete}>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownView;
