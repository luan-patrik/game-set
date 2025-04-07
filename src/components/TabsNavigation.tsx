import { TabExplorerOption } from './TabExplorerOption'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export const TabsNavigation = () => {
  return (
    <div className='container mt-2 mb-4 flex flex-col gap-4'>
      <Tabs defaultValue='explorar' className='w-full'>
        <TabsList className='mb-8 grid w-full grid-cols-3'>
          <TabsTrigger
            value='explorar'
            className='!rounded-button whitespace-nowrap'
          >
            Explorar
          </TabsTrigger>
          <TabsTrigger
            value='adicionar'
            className='!rounded-button whitespace-nowrap'
          >
            Adicionar
          </TabsTrigger>
          <TabsTrigger
            value='minhas'
            className='!rounded-button whitespace-nowrap'
          >
            Minhas Configs
          </TabsTrigger>
        </TabsList>
        <TabExplorerOption />
      </Tabs>
    </div>
  )
}
