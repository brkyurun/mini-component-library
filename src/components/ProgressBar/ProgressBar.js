import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const STYLES = {
  small: {
    height: 8,
    padding: 0,
    radius: 4,
  },
  medium: {
    height: 12,
    padding: 0,
    radius: 4,
  },
  large: {
    height: 16,
    padding: 4,
    radius: 8,
  },
};

const ProgressBar = ({ value, size }) => {
  const styles = STYLES[size];

  if (!styles) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }

  return (
    <Wrapper
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{
        "--padding": styles.padding + "px",
        "--radius": styles.radius + "px",
      }}
    >
      <VisuallyHidden>{value}%</VisuallyHidden>
      <BarWrapper>
        <Bar
          style={{
            "--width": value + "%",
            "--height": styles.height + "px",
          }}
        />
      </BarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  border-radius: var(--radius);
  padding: var(--padding);
  width: clamp(208px, 100%, 408px);
`;

const BarWrapper = styled.div`
  border-radius: 4px;
  /* Trim off corners when progress bar is near-full. */
  overflow: hidden;
`;

const Bar = styled.div`
  width: var(--width);
  height: var(--height);
  background-color: ${COLORS.primary};
  border-radius: 4px 0 0 4px;
`;

export default ProgressBar;

// my solution using native <progress> element
// const SIZES = {
//   small: {
//     "--height": ".5rem",
//     "--borderRadius": "4px",
//   },
//   medium: {
//     "--height": ".75rem",
//     "--borderRadius": "4px",
//   },
//   large: {
//     "--height": "1.5rem",
//     "--padding": "4px",
//     "--borderRadius": "8px",
//   },
// };

// const ProgressBar = ({ value, size }) => {
//   const componentSize = SIZES[size];

//   return (
//     <>
//       <VisuallyHidden>Currently at {value} percent.</VisuallyHidden>
//       <StyledProgress
//         value={value}
//         max={100}
//         aria-label={`Currently at ${value} percent`}
//         aria-valuemin="0"
//         aria-valuemax="100"
//         aria-valuenow={value}
//         size={size}
//         style={componentSize}
//       ></StyledProgress>
//     </>
//   );
// };

// const StyledProgress = styled.progress`
//   width: 370px;
//   height: var(--height);
//   -webkit-appearance: none;
//   appearance: none;

//   &::-webkit-progress-bar {
//     background-color: ${COLORS.transparentGray15};
//     box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
//     border-radius: var(--borderRadius);
//     padding: var(--padding);
//   }

//   &::-webkit-progress-value {
//     background-color: ${COLORS.primary};
//     border-radius: ${({ value }) => (value !== 100 ? "4px 0 0 4px" : "4px")};
//   }
// `;
