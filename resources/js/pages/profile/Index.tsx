
interface Props {
  stadistics: any[];
  user: string;
}

export default function ProfileIndex( {stadistics, user}: Props ) {
  
console.log('ProfileIndex', stadistics, user);
  return (
    <div>
      <h1>Perfil de {user}</h1>
      <ul>
        {stadistics.map((stat) => (
          <li key={stat.total_questions}>
            Estadística ID: {stat.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
