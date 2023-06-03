import Headling1 from "@/components/Headling1"
import Headling2 from "@/components/Headling2"
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const linkSchema = yup.object({
  name: yup.string().required(),
  publicName: yup.string().required(),
  slug: yup.string().required(),
  destination: yup.string().required(),
  appLink: yup.string().required(),
}).required()

interface NewLinkForm {
  name: string
  publicName: string
  slug: string
  destination: string
  appLink: string
}

const Links = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(linkSchema)
  })
  const submit: SubmitHandler<NewLinkForm> = (inputs) => {
    console.log(inputs)
  }

  return (
    <>
      <pre>{errors.name?.message}</pre>
      <div className="grid grird-cols-1 grid-cols-2">
        <div>
          <Headling1>Gerenciador de links</Headling1>
          <Headling2>Gerenciador de links</Headling2>
        </div>
        {/** Buttons */}
        <div className="flex items-center">
          <button
            type="button"
            className="w-full px-4 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100"
          >
            Criar link
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 text-base font-medium text-black bg-white border hover:bg-gray-100"
          >
            Criar Grupo
          </button>
        </div>
      </div>
      {/** Form */}
      <form onSubmit={handleSubmit(submit)}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4 mt-4">
        <div className="p-4 border-t-2 border-indigo-400 rounded-lg bg-gray-100/5 ">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <Headling2>Criar link</Headling2>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Identificação</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className="space-y-5">
                <div className=" relative ">
                  <input
                    type="text"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Nome interno"
                    {...register('name')}
                  />
                </div>
                <div className=" relative ">
                  <input
                    type="text"
                    id="user-info-email"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Nome público"
                    {...register('publicName')}
                  />
                </div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Identificador (slug)"
                    {...register('slug')}
                  />
                </div>
              </div>

            </div>
          </div>

          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Destino</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="https://"
                    {...register('destination')}
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="TDB link interno para app"
                    {...register('appLink')}
                  />
                </div>
              </div>
              <hr />
              <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                <button
                  type="submit"
                  className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Links