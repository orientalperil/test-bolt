import Form from "~/lib/form";
import {useRouter} from "next/router";

export default function Create() {
  const router = useRouter()
  const onSubmit = async (data) => {
    const response = await fetch('/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const pokemon = await response.json()
    await router.push(`/pokedex/${pokemon.id}`)
  };

  return (
    <>
      <div className="bg-dark text-white rounded-lg my-8 p-8 max-w-7xl">
        <div className="text-2xl font-bold mb-4">New Pokemon</div>
        <Form onSubmit={onSubmit} cancelRedirect="/pokedex"/>
      </div>
    </>
  );
}
