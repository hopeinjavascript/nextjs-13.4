export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        backgroundColor: 'lightpink',
      }}
    >
      {/* Include shared UI here e.g. a header or sidebar */}
      <p>Dashboard Layout</p>

      {children}
    </section>
  );
}
