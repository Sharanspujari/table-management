export const ErrorState = ({ message }) => {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded text-red-700">
      {message}
    </div>
  );
};
