function LoadingContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-5xl roboto text-lg">
      <h1 className="uppercase">loading</h1><h1 className="uppercase pl-4">experience</h1>
      <div style={{ display: "none" }}>{children}</div>
    </div>
  );
}

export default function Loading({
  children,
  isLoading,
  isFetched,
  isFetching,
  isRefetching,
  isSuccess,
  content,
}: Readonly<{
  children: React.ReactNode;
  isLoading: boolean;
  isFetched: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  content: string | undefined;
}>) {
  if (isLoading || isFetching || isRefetching || !isSuccess) {
    return <LoadingContent>{children}</LoadingContent>;
  }

  return <>{children}</>;
}
