import MarkerCard from "./MarkerCard";

const OtherMarkers = ({ markers, userId }) => {
  return (
    <div>
      {markers.map((marker) => {
        return <MarkerCard key={marker.id} marker={marker} userId={userId} />;
      })}
    </div>
  );
};

export default OtherMarkers;
