export const NodeHeader = (props: any) => {
  const { children } = props;
  return (
    <div
      style={{
        fontSize: 14,
        letterSpacing: 1,
        paddingBottom: 5,
        color: "rgba(255, 255, 255, 0.7)",
      }}
    >
      {children}
    </div>
  );
};
