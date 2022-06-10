const FullPageErrorFallback = ({ error }: any) => {
  return (
    <div role="alert">
      <p>يوجد مشكلة في التطبيق. جرب تحديث الصفحة</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default FullPageErrorFallback;
