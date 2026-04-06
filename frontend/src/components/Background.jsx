import DarkVeil from './DarkVeil';

export default function Background() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <DarkVeil
        noiseIntensity={0.08}
        scanlineFrequency={1.2}
        warpAmount={0.35}
        speed={0.35}
      />
    </div>
  );
}
