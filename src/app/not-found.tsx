import FuzzyText from "../components/FuzzyText";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
        404! fot nound.
      </FuzzyText>
    </div>
  );
}
