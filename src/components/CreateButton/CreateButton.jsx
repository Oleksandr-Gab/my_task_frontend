function CreateButton({ children, onSubmit }) {
  return (
    <button type="submit" onClick={() => onSubmit()}>
      {children}
    </button>
  );
}

export default CreateButton;
