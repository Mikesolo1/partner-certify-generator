
export const PartnerDetailsLoading = ({ partnerId }: { partnerId: string }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* White header like in admin dashboard */}
      <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Загрузка данных партнера...</h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-t-blue-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Загрузка данных партнера...</h2>
            <p className="text-gray-500">ID: {partnerId}</p>
            <p className="text-gray-500 text-sm mt-4">Пожалуйста, подождите</p>
          </div>
        </div>
      </div>
    </div>
  );
};
