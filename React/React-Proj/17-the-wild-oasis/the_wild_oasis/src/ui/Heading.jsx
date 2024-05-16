import styled, { css } from "styled-components";

// styled components - compo based styling -> achieve the same with tailwind but styled compo gives more control.but tailwind has utility classes.

// css function for generating teh css within a template literal
// const test = css`
// ${10 > 5 && 'font-size: 40px'}
// text-align: center;
//   background-color: var(--color-brand-800);
// `;
// as prop -> what ele to be rendered as

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
    line-height: 1.4;
`;

export default Heading;
