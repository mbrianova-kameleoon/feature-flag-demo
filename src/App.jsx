import { createClient, KameleoonProvider, useFeatureFlag } from '@kameleoon/react-sdk';
import './App.css';

const client = createClient({
  siteCode: 'giv1l0ud59',
  configuration: {
    environment: import.meta.env.MODE === 'development' ? 'development' : 'production',
  }
});

function FeatureFlagDemo() {
  const { isActive, error, loading } = useFeatureFlag('onboarding-flag');
  
  console.log('Environment:', import.meta.env.MODE);
  console.log('Kameleoon SDK Status:', loading ? 'Loading...' : 'Ready');
  console.log('Feature Flag Status:', isActive ? 'ON' : 'OFF');

  if (loading) {
    return <div className="flag-block">Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="flag-block">
        <h3>Error loading feature flag</h3>
        <p>{error.message}</p>
      </div>
    );
  };

  return (
    <>
      {isActive ? (
        <div className="flag-block flag-block--active">
          <h2>New Feature (DEV)</h2>
          <p>Flag: onboarding-flag is <strong>ON</strong></p>
        </div>
      ) : (
        <div className="flag-block">
          <h2>Old Version (PROD)</h2>
          <p>Flag: onboarding-flag is <strong>OFF</strong></p>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <KameleoonProvider client={client}>
      <div>
        <h1>Kameleoon Feature Flag Demo</h1>
        <FeatureFlagDemo />
      </div>
    </KameleoonProvider>
  );
};

export default App;
