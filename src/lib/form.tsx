import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {pokemonTypes} from "~/lib/utils";
import FileInput from "~/lib/fileInput";

export default function Form({ onSubmit, buttonText="Save", cancelRedirect, defaultValues = {}, imageDefaults = {} }) {
  const router = useRouter()

  const options = pokemonTypes.map((t) => ({value: t, label: t}));
  options.unshift({value: '', label: 'Type'})

  const cancel = async () => {
    await router.push(cancelRedirect)
  }

  const fileChange = (field) => {
    return async (event) => {
      const file = event.target.value
      const formData = new FormData();
      formData.append('file', file); // 'file' is the name of the field expected by the server

      try {
        const response = await fetch('/upload', {
          method: 'PUT',
          body: formData
        });
        const blob = await response.json()
        setValue(field, blob.pathname)
        blob.url
      } catch (error) {
        alert('Server had a problem')
      }
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({defaultValues});

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <input {...register("name", { required: true })}
                 className="w-2/3 py-2.5 ps-5 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                 placeholder="Name" />
          <input {...register("number", { required: true })}
                 className="w-1/3 py-2.5 ps-5 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                 placeholder="Number" />
        </div>
        <div className="bg-gray-solid rounded-lg mt-4 p-4">
          <div>Pokemon Photo</div>
          <FileInput fieldName="pokemonPhoto" register={register} setValue={setValue} defaultValue={imageDefaults.pokemonPhotoUrl}/>
        </div>
        <select className="bg-gray-solid text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
                {...register("type", {required: true})}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <textarea {...register('description', { required: true })}
                  className="w-full py-2.5 ps-4 text-sm text-white rounded-lg bg-gray-solid placeholder-white mt-4"
                  placeholder="Description"
                  rows="5">
        </textarea>
        <div className="flex gap-4 mt-4">
          <input {...register("height", { required: true })}
                 className="w-1/2 py-2.5 ps-5 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                 placeholder="Height" />
          <input {...register("weight", { required: true })}
                 className="w-1/2 py-2.5 ps-5 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                 placeholder="Weight" />
        </div>
        <div className="flex gap-4 mt-4">
          <input {...register("maleGenderRatio", { required: true })}
                 className="w-1/2 py-2.5 ps-5 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                 placeholder="♂ Gender Ratio" />
          <input {...register("femaleGenderRatio", { required: true })}
                 className="w-1/2 py-2.5 ps-5 text-sm text-white rounded-lg bg-gray-solid placeholder-white"
                 placeholder="♀ Gender Ratio" />
        </div>
        <input {...register('abilities', { required: true })}
               className="w-full py-2.5 ps-4 text-sm text-white rounded-lg bg-gray-solid placeholder-white mt-4"
               placeholder="Abilities"/>
        <input {...register('eggGroups', { required: true })}
               className="w-full py-2.5 ps-4 text-sm text-white rounded-lg bg-gray-solid placeholder-white mt-4"
               placeholder="Egg Groups"/>
        <input {...register('evolutions', { required: true })}
               className="w-full py-2.5 ps-4 text-sm text-white rounded-lg bg-gray-solid placeholder-white mt-4"
               placeholder="Evolution description"/>
        <div className="bg-gray-solid rounded-lg mt-4 p-4">
          <div>Evolution Photo</div>
          <FileInput fieldName="evolutionPhoto" register={register} setValue={setValue} defaultValue={imageDefaults.evolutionPhotoUrl}/>
        </div>

        <div className="flex justify-end mt-4">
          <button type="button"
                  className="text-black bg-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  onClick={cancel}>
            Cancel
          </button>
          <button type="submit"
                  className="text-white bg-gray-solid font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
}
