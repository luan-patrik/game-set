'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Check,
  ChevronDown,
  Edit,
  Eye,
  Filter,
  Moon,
  Plus,
  Save,
  Search,
  Share2,
  Sun,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
export default function Teste() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeTab, setActiveTab] = useState('explorar')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [uploadMethod, setUploadMethod] = useState<'file' | 'text'>('text')
  const [configText, setConfigText] = useState('')
  const [configName, setConfigName] = useState('')
  const [configDescription, setConfigDescription] = useState('')
  // Dados de exemplo
  const games = [
    { id: 1, name: 'Counter-Strike 2', icon: 'fa-gun' },
    { id: 2, name: 'Valorant', icon: 'fa-crosshairs' },
    { id: 3, name: 'League of Legends', icon: 'fa-gamepad' },
    { id: 4, name: 'Fortnite', icon: 'fa-person-rifle' },
    { id: 5, name: 'Minecraft', icon: 'fa-cube' },
    { id: 6, name: 'Call of Duty', icon: 'fa-shield' },
    { id: 7, name: 'Apex Legends', icon: 'fa-mask' },
    { id: 8, name: 'Dota 2', icon: 'fa-swords' },
  ]
  const configs = [
    {
      id: 1,
      game: 'Counter-Strike 2',
      name: 'Config Pro FPS',
      preview: 'sensitivity 2.5; cl_crosshairsize 3; cl_crosshairgap -1...',
      user: {
        name: 'ProGamer',
        avatar:
          'https://public.readdy.ai/ai/img_res/7252559d8cd9df1dc87e924e46dd42af.jpg',
      },
      isPublic: true,
      isMine: false,
    },
    {
      id: 2,
      game: 'Valorant',
      name: 'Config Competitiva',
      preview:
        'MouseSensitivity=0.45; AimSensitivity=0.4; ScopeSensitivity=0.9...',
      user: {
        name: 'TaticaMaster',
        avatar:
          'https://public.readdy.ai/ai/img_res/3cb4a6b564ea1fa22dd3d65ebfbb4a7f.jpg',
      },
      isPublic: true,
      isMine: false,
    },
    {
      id: 3,
      game: 'League of Legends',
      name: 'Config Pro Support',
      preview:
        'PersistedSettings={\n  "General.AutoAcquireTarget": 1,\n  "HUD.ShowTimers": 1...',
      user: {
        name: 'SupportLegend',
        avatar:
          'https://public.readdy.ai/ai/img_res/b4558acf104a49931956e32842782873.jpg',
      },
      isPublic: true,
      isMine: false,
    },
    {
      id: 4,
      game: 'Counter-Strike 2',
      name: 'Minha Config Pessoal',
      preview: 'sensitivity 1.8; cl_crosshairsize 2; cl_crosshairgap -2...',
      user: {
        name: 'Você',
        avatar:
          'https://readdy.ai/api/search-image?query=gaming profile picture of a casual gamer with dark background, minimalist style, high quality portrait, gaming aesthetic&width=100&height=100&seq=4&orientation=squarish',
      },
      isPublic: true,
      isMine: true,
    },
    {
      id: 5,
      game: 'Valorant',
      name: 'Config Treino',
      preview:
        'MouseSensitivity=0.5; AimSensitivity=0.5; ScopeSensitivity=1.0...',
      user: {
        name: 'Você',
        avatar:
          'https://readdy.ai/api/search-image?query=gaming profile picture of a casual gamer with dark background, minimalist style, high quality portrait, gaming aesthetic&width=100&height=100&seq=4&orientation=squarish',
      },
      isPublic: false,
      isMine: true,
    },
  ]
  // Aplicar tema
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])
  // Filtrar configurações
  const filteredConfigs = configs.filter((config) => {
    const matchesGame = !selectedGame || config.game === selectedGame
    const matchesSearch =
      !searchQuery ||
      config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.game.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeTab === 'explorar') {
      return matchesGame && matchesSearch && config.isPublic
    } else if (activeTab === 'minhas') {
      return matchesGame && matchesSearch && config.isMine
    }
    return false
  })
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const getGameIcon = (gameName: string) => {
    const game = games.find((g) => g.name === gameName)
    return game ? game.icon : 'fa-gamepad'
  }
  return (
    <div className={`bg-background text-foreground min-h-screen`}>
      {/* Header */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b backdrop-blur'>
        <div className='container flex h-16 items-center justify-between'>
          <div className='flex items-center gap-2'>
            <i className='fas fa-gamepad text-primary text-2xl'></i>
            <h1 className='text-xl font-bold'>GameConfig</h1>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='theme-switch' className='cursor-pointer'>
                {theme === 'dark' ? (
                  <Moon className='h-4 w-4' />
                ) : (
                  <Sun className='h-4 w-4' />
                )}
              </Label>
            </div>
            <Avatar className='cursor-pointer'>
              <AvatarImage
                src='https://readdy.ai/api/search-image?query=gaming profile picture of a casual gamer with dark background, minimalist style, high quality portrait, gaming aesthetic&width=100&height=100&seq=4&orientation=squarish'
                alt='Perfil'
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className='container py-6'>
        <Tabs
          defaultValue='explorar'
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full'
        >
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
          {/* Explorar Tab */}
          <TabsContent value='explorar' className='space-y-6'>
            <div className='flex flex-col gap-4'>
              <div className='relative flex items-center gap-2'>
                <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform' />
                <Input
                  type='text'
                  placeholder='Pesquisar configurações...'
                  className='pl-10'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      className='!rounded-button gap-2 whitespace-nowrap'
                    >
                      <Filter className='h-4 w-4' />
                      Filtrar
                      <ChevronDown className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                      onClick={() => setSelectedGame(null)}
                      className='cursor-pointer'
                    >
                      Todos os jogos
                      {!selectedGame && <Check className='ml-auto h-4 w-4' />}
                    </DropdownMenuItem>
                    <Separator />
                    {games.map((game) => (
                      <DropdownMenuItem
                        key={game.id}
                        onClick={() => setSelectedGame(game.name)}
                        className='cursor-pointer'
                      >
                        <i className={`fas ${game.icon} mr-2`}></i>
                        {game.name}
                        {selectedGame === game.name && (
                          <Check className='ml-auto h-4 w-4' />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='flex gap-2 overflow-x-auto pb-2'>
                <Button
                  variant={!selectedGame ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setSelectedGame(null)}
                  className='!rounded-button whitespace-nowrap'
                >
                  Todos
                </Button>
                {games.map((game) => (
                  <Button
                    key={game.id}
                    variant={selectedGame === game.name ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setSelectedGame(game.name)}
                    className='!rounded-button whitespace-nowrap'
                  >
                    <i className={`fas ${game.icon} mr-2`}></i>
                    {game.name}
                  </Button>
                ))}
              </div>
              {selectedGame && (
                <div className='flex items-center'>
                  <Badge variant='outline' className='flex items-center gap-1'>
                    {selectedGame}
                    <X
                      className='h-3 w-3 cursor-pointer'
                      onClick={() => setSelectedGame(null)}
                    />
                  </Badge>
                </div>
              )}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {filteredConfigs.length > 0 ? (
                  filteredConfigs
                    .filter((config) => config.isPublic)
                    .map((config) => (
                      <Card key={config.id} className='overflow-hidden'>
                        <CardHeader className='pb-2'>
                          <div className='flex items-start justify-between'>
                            <div>
                              <Badge variant='outline' className='mb-2'>
                                <i
                                  className={`fas ${getGameIcon(config.game)} mr-2`}
                                ></i>
                                {config.game}
                              </Badge>
                              <CardTitle>{config.name}</CardTitle>
                            </div>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='!rounded-button cursor-pointer whitespace-nowrap'
                            >
                              <Save className='h-4 w-4' />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className='pb-2'>
                          <div className='bg-muted overflow-hidden rounded-md p-3 font-mono text-xs text-ellipsis whitespace-nowrap'>
                            {config.preview}
                          </div>
                        </CardContent>
                        <CardFooter className='flex justify-between pt-2'>
                          <div className='flex items-center gap-2'>
                            <Avatar className='h-6 w-6'>
                              <AvatarImage
                                src={config.user.avatar}
                                alt={config.user.name}
                              />
                              <AvatarFallback>
                                {config.user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className='text-muted-foreground text-sm'>
                              {config.user.name}
                            </span>
                          </div>
                          <a
                            href='https://readdy.ai/home/9986452d-bab7-4a66-906f-a6f9ff55a841/8bc9e623-2179-45cc-ad54-a7887af9f6e8'
                            data-readdy='true'
                          >
                            <Button
                              variant='ghost'
                              size='sm'
                              className='!rounded-button cursor-pointer whitespace-nowrap'
                            >
                              <Eye className='mr-1 h-4 w-4' />
                              Ver
                            </Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className='col-span-full flex flex-col items-center justify-center py-12 text-center'>
                    <i className='fas fa-search text-muted-foreground mb-4 text-4xl'></i>
                    <h3 className='text-xl font-medium'>
                      Nenhuma configuração encontrada
                    </h3>
                    <p className='text-muted-foreground mt-2'>
                      Tente ajustar seus filtros ou criar uma nova configuração
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          {/* Adicionar Tab */}
          <TabsContent value='adicionar' className='space-y-6'>
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Nova Configuração</CardTitle>
                <CardDescription>
                  Crie e compartilhe suas configurações de jogos com a
                  comunidade
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='game-select'>Jogo</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        className='!rounded-button w-full justify-between whitespace-nowrap'
                      >
                        {selectedGame || 'Selecione um jogo'}
                        <ChevronDown className='ml-2 h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full'>
                      {games.map((game) => (
                        <DropdownMenuItem
                          key={game.id}
                          onClick={() => setSelectedGame(game.name)}
                          className='cursor-pointer'
                        >
                          <i className={`fas ${game.icon} mr-2`}></i>
                          {game.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='config-name'>Nome da Configuração</Label>
                  <Input
                    id='config-name'
                    placeholder='Ex: Config Competitiva Pro'
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='config-description'>
                    Descrição (opcional)
                  </Label>
                  <textarea
                    id='config-description'
                    placeholder='Descreva sua configuração...'
                    rows={3}
                    value={configDescription}
                    onChange={(e) => setConfigDescription(e.target.value)}
                  />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Label>Método de Entrada</Label>
                    <div className='flex items-center space-x-2 rounded-lg border p-1'>
                      <Button
                        variant={uploadMethod === 'text' ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => setUploadMethod('text')}
                        className='!rounded-button whitespace-nowrap'
                      >
                        <Edit className='mr-2 h-4 w-4' />
                        Editor
                      </Button>
                      <Button
                        variant={uploadMethod === 'file' ? 'default' : 'ghost'}
                        size='sm'
                        onClick={() => setUploadMethod('file')}
                        className='!rounded-button whitespace-nowrap'
                      >
                        <Upload className='mr-2 h-4 w-4' />
                        Upload
                      </Button>
                    </div>
                  </div>
                  {uploadMethod === 'text' ? (
                    <div className='bg-muted/30 rounded-lg border p-4'>
                      <textarea
                        className='bg-background min-h-[200px] resize-none font-mono text-sm'
                        placeholder='Cole ou digite sua configuração aqui...'
                        value={configText}
                        onChange={(e) => setConfigText(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className='bg-muted/30 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8'>
                      <div className='bg-primary/10 rounded-full p-4'>
                        <Upload className='text-primary h-6 w-6' />
                      </div>
                      <div className='text-center'>
                        <p className='font-medium'>
                          Arraste e solte seu arquivo aqui
                        </p>
                        <p className='text-muted-foreground mt-1 text-sm'>
                          ou clique para selecionar
                        </p>
                      </div>
                      <Button
                        variant='outline'
                        className='!rounded-button whitespace-nowrap'
                      >
                        Selecionar Arquivo
                      </Button>
                      <p className='text-muted-foreground text-xs'>
                        Formatos suportados: .cfg, .ini, .txt, .json
                      </p>
                    </div>
                  )}
                </div>
                <div className='flex items-center space-x-2'>
                  <Label htmlFor='public-switch'>
                    Tornar configuração pública
                  </Label>
                </div>
              </CardContent>
              <CardFooter className='flex justify-end gap-2'>
                <Button
                  variant='outline'
                  className='!rounded-button whitespace-nowrap'
                >
                  Cancelar
                </Button>
                <Button className='!rounded-button whitespace-nowrap'>
                  Salvar Configuração
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* Minhas Configs Tab */}
          <TabsContent value='minhas' className='space-y-6'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <Search className='text-muted-foreground absolute top-[151px] left-[27px] h-4 w-4 -translate-y-1/2 transform' />
                <Input
                  type='text'
                  placeholder='Pesquisar minhas configurações...'
                  className='pl-10'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      className='!rounded-button gap-2 whitespace-nowrap'
                    >
                      <Filter className='h-4 w-4' />
                      Filtrar
                      <ChevronDown className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                      onClick={() => setSelectedGame(null)}
                      className='cursor-pointer'
                    >
                      Todos os jogos
                      {!selectedGame && <Check className='ml-auto h-4 w-4' />}
                    </DropdownMenuItem>
                    <Separator />
                    {games.map((game) => (
                      <DropdownMenuItem
                        key={game.id}
                        onClick={() => setSelectedGame(game.name)}
                        className='cursor-pointer'
                      >
                        <i className={`fas ${game.icon} mr-2`}></i>
                        {game.name}
                        {selectedGame === game.name && (
                          <Check className='ml-auto h-4 w-4' />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {selectedGame && (
                <div className='flex items-center'>
                  <Badge variant='outline' className='flex items-center gap-1'>
                    {selectedGame}
                    <X
                      className='h-3 w-3 cursor-pointer'
                      onClick={() => setSelectedGame(null)}
                    />
                  </Badge>
                </div>
              )}
              {filteredConfigs.filter((config) => config.isMine).length > 0 ? (
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {filteredConfigs
                    .filter((config) => config.isMine)
                    .map((config) => (
                      <Card key={config.id}>
                        <CardHeader className='pb-2'>
                          <div className='flex items-start justify-between'>
                            <div>
                              <Badge variant='outline' className='mb-2'>
                                <i
                                  className={`fas ${getGameIcon(config.game)} mr-2`}
                                ></i>
                                {config.game}
                              </Badge>
                              <CardTitle>{config.name}</CardTitle>
                            </div>
                            <Badge
                              variant={
                                config.isPublic ? 'default' : 'secondary'
                              }
                            >
                              {config.isPublic ? 'Público' : 'Privado'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className='pb-2'>
                          <div className='bg-muted overflow-hidden rounded-md p-3 font-mono text-xs text-ellipsis whitespace-nowrap'>
                            {config.preview}
                          </div>
                        </CardContent>
                        <CardFooter className='flex justify-end gap-2 pt-2'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant='destructive'
                                size='icon'
                                className='!rounded-button cursor-pointer whitespace-nowrap'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmar exclusão</DialogTitle>
                                <DialogDescription>
                                  Tem certeza que deseja excluir a configuração
                                  "{config.name}"? Esta ação não pode ser
                                  desfeita.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button
                                  variant='outline'
                                  className='!rounded-button whitespace-nowrap'
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  variant='destructive'
                                  className='!rounded-button whitespace-nowrap'
                                >
                                  Excluir
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant='outline'
                            size='icon'
                            className='!rounded-button cursor-pointer whitespace-nowrap'
                          >
                            <Share2 className='h-4 w-4' />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant='outline'
                                size='icon'
                                className='!rounded-button cursor-pointer whitespace-nowrap'
                              >
                                <Edit className='h-4 w-4' />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className='max-w-md'>
                              <DialogHeader>
                                <DialogTitle>Editar Configuração</DialogTitle>
                                <DialogDescription>
                                  Modifique os detalhes da sua configuração
                                </DialogDescription>
                              </DialogHeader>
                              <div className='space-y-4 py-4'>
                                <div className='space-y-2'>
                                  <Label htmlFor='edit-config-name'>
                                    Nome da Configuração
                                  </Label>
                                  <Input
                                    id='edit-config-name'
                                    placeholder='Ex: Config Competitiva Pro'
                                    defaultValue={config.name}
                                  />
                                </div>
                                <div className='space-y-2'>
                                  <Label htmlFor='edit-config-description'>
                                    Descrição (opcional)
                                  </Label>
                                  <textarea
                                    id='edit-config-description'
                                    placeholder='Descreva sua configuração...'
                                    rows={3}
                                    defaultValue=''
                                  />
                                </div>
                                <div className='space-y-2'>
                                  <Label htmlFor='edit-config-content'>
                                    Conteúdo da Configuração
                                  </Label>
                                  <textarea
                                    id='edit-config-content'
                                    className='min-h-[200px] resize-none font-mono text-sm'
                                    defaultValue={config.preview}
                                  />
                                </div>
                                <div className='flex items-center space-x-2'>
                                  <Label htmlFor='edit-public-switch'>
                                    Tornar configuração pública
                                  </Label>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant='outline'
                                  className='!rounded-button whitespace-nowrap'
                                >
                                  Cancelar
                                </Button>
                                <Button className='!rounded-button whitespace-nowrap'>
                                  Salvar Alterações
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <a
                            href='https://readdy.ai/home/9986452d-bab7-4a66-906f-a6f9ff55a841/8bc9e623-2179-45cc-ad54-a7887af9f6e8'
                            data-readdy='true'
                          >
                            <Button
                              size='sm'
                              className='!rounded-button cursor-pointer whitespace-nowrap'
                            >
                              <Eye className='mr-1 h-4 w-4' />
                              Ver
                            </Button>
                          </a>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center py-12 text-center'>
                  <i className='fas fa-folder-open text-muted-foreground mb-4 text-4xl'></i>
                  <h3 className='text-xl font-medium'>
                    Nenhuma configuração encontrada
                  </h3>
                  <p className='text-muted-foreground mt-2'>
                    Você ainda não criou nenhuma configuração
                  </p>
                  <Button
                    onClick={() => setActiveTab('adicionar')}
                    className='!rounded-button mt-4 whitespace-nowrap'
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    Criar Nova Configuração
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      {/* Footer */}
      <footer className='border-t py-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row'>
          <div className='flex items-center gap-2'>
            <i className='fas fa-gamepad text-primary text-lg'></i>
            <p className='text-muted-foreground text-sm'>GameConfig © 2025</p>
          </div>
          <div className='flex items-center gap-4'>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground text-sm'
            >
              Termos
            </a>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground text-sm'
            >
              Privacidade
            </a>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground text-sm'
            >
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
