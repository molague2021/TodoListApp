interface ListContainerProps {
  name?: string;
  displayButton?: boolean;
  buttonName?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const ListContainer = ({
  name,
  displayButton = false,
  buttonName,
  onClick,
  children,
}: ListContainerProps) => {
  return (
    <div className="title">
      <form>
        <div className="card-container">
          <h2>{name}</h2>
          <div className="btn-container">
            {displayButton && (
              <button className="btn btn-primary" onClick={onClick}>
                {buttonName}
              </button>
            )}
          </div>
        </div>
        {children}
      </form>
    </div>
  );
};
