import styled from "@emotion/styled";

//calendar switcher
export const IconWrapper = styled.div`
  svg {
    stroke: ${(props) =>
      props.isCurrentMonth ? "transparent" : "rgba(50, 63, 71, 1)"};
  }
`;

export const Days = styled.div`
  grid-template-rows: ${(props) =>
    props.lastDayNumber === 31 ? "repeat(5, auto)" : "repeat(4, auto)"};

  @media screen and (min-width: 768px) {
    grid-template-rows: repeat(4, auto);
  }
`;

export const Day = styled.button`
  color: ${({ isToday }) =>
    isToday ? "#9be1a0" : "rgba(50, 63, 71, 1)"}; // todo
  background: ${({ isToday, percentage }) => {
    if (isToday) {
      return "#323F47";
    }
    if (percentage === 100) {
      return "rgba(255, 255, 255, 1)";
    }
    return "rgba(50, 63, 71, 0.2)";
  }};
`;
