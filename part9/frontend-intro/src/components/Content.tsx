interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part, i) => (
        <p key={i}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
