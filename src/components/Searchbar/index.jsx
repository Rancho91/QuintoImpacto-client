/* eslint-disable react/prop-types */
import "./styles.css";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const Searchbar = (props) => {
  const { functionText, text } = props;

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <IconButton className="searchbar-icon-button" disabled>
          <SearchIcon className="searchbar-icon" />
        </IconButton>
        <InputBase
          className="searchbar-input"
          placeholder="Buscar Proveedores"
          autoFocus={text !== null}
          inputProps={{ "aria-label": "searchbar" }}
          value={text !== null ? text : ""}
          onChange={(evt) => functionText(evt.target.value)}
        />
      </div>
    </div>
  );
};

export default Searchbar;
