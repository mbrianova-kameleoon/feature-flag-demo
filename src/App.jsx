import { createClient, KameleoonProvider, useFeatureFlag, useInitialize, useVisitorCode } from '@kameleoon/react-sdk';
import './App.css';
import { useEffect, useState } from 'react';

const siteCode = 'giv1l0ud59';
const featureFlagKey = 'onboarding-flag';

const client = createClient({
  siteCode: siteCode,
  configuration: {
    environment: import.meta.env.MODE === 'development' ? 'development' : 'production',
    updateInterval: 1,
  }
});

function FeatureFlagDemo() {
  const { initialize } = useInitialize();
  const { isFeatureFlagActive } = useFeatureFlag();
  const { getVisitorCode } = useVisitorCode();
  
  const [isReady, setIsReady] = useState(false);
  const [isFlagOn, setIsFlagOn] = useState(false);

  useEffect(() => {
    async function initAndCheck() {
      try {
        //window.localStorage.clear();
        await initialize();
        
        const visitorCode = getVisitorCode();
        const active = isFeatureFlagActive(visitorCode, featureFlagKey);
        
        console.log('SDK initialized. Flag status:', active);
        
        setIsFlagOn(active);
        setIsReady(true);
      } catch (error) {
        console.error("Kameleoon SDK failed to initialize:", error);
      }
    }

    initAndCheck();
  }, [initialize, getVisitorCode, isFeatureFlagActive]);

  if (!isReady) {
    return <div>Loading Feature Flags...</div>;
  }

  return (
    <>
      {isFlagOn ? (
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
