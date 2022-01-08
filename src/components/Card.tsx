import { StyledCard } from "../styles/StyledCard";

type Props = {
  isActive: boolean;
  callback: () => void;
  source: string;
};

export const Card = ({ isActive, callback, source }: Props) => (
  <StyledCard className={isActive ? "active" : ""} onClick={callback}>
    <img className="frontface" src={source} alt="Front Card" />
    <div className="backface"></div>
  </StyledCard>
);
