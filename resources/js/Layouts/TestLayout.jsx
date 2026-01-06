// resources/js/Layouts/TestLayout.jsx
const TestLayout = ({ children, user }) => (
  <div style={{ backgroundColor: 'lime', padding: '20px' }}>
    <h1>✅ TEST LAYOUT FUNCIONANDO</h1>
    <p>Usuario: {user?.name || 'invitado'}</p>
    <div>{children}</div>
  </div>
);

export default TestLayout;
