import styled from "styled-components";

const Button = styled.div`
  background: ${(props) => props.theme.mainColor};
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 13px;
  transition: 0.2s;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.5;
  }
`;

export default Button;
