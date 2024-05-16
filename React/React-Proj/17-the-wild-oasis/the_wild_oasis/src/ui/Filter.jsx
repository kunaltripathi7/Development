import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1); // if on page 3 & data is less
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((obj) => (
        <FilterButton
          onClick={() => handleClick(obj.value)}
          active={obj.value === currentFilter ? "true" : "false"}
          disabled={obj.value === currentFilter}
          key={obj.value}
        >
          {obj.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

// req -> share the url -> connected to a specific state in compo after sorting/filtering
// filter compo can be anywhere present cuz we are storing state in the url
