import {
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/app/api/api-client";
import { HighlightsClient } from "@/components/Highlights/HighlightsClient";
import type { HighlightDto, PageHighlightDto } from "@/app/api/generated";
import type { HighlightInitialPageData } from "./types";
import { PAGE_SIZE } from "./types";

interface SearchParams {
  page?: string;
}

function filterAndSortHighlights(content: HighlightDto[] = []): HighlightDto[] {
  return content
    .filter((highlight) => highlight.videoUrl)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
}

async function fetchInitialData(
  page: number
): Promise<HighlightInitialPageData> {
  try {
    const response = await apiClient.highlights.findAll({
      page,
      size: PAGE_SIZE,
    });
    const data = response as PageHighlightDto;

    return {
      highlights: filterAndSortHighlights(data?.content),
      totalPages: data?.totalPages || 0,
      totalElements: data?.totalElements || 0,
      error: null,
    };
  } catch (error) {
    console.error("Error fetching highlights:", error);
    return {
      highlights: [],
      totalPages: 0,
      totalElements: 0,
      error: "Une erreur est survenue lors du chargement des points forts.",
    };
  }
}

export default async function HighlightsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams
  const currentPage = Number(resolvedSearchParams.page) || 0
  const initialData = await fetchInitialData(currentPage);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mt-10 mb-6 text-sm">
          <ul className="flex items-center space-x-1">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Accueil
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4" />
            </li>
            <li className="text-gray-600">Points forts</li>
          </ul>
        </nav>

        {/* Latest Highlights */}
        {/* <Highlights /> */}
        <HighlightsClient
          initialData={initialData}
          initialPage={currentPage}
          pageSize={PAGE_SIZE}
        />
      </div>
    </section>
  );
}

// function Highlights() {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [highlights, setHighlights] = useState<HighlightDto[]>([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);
//   const [error, setError] = useState<string | null>(null);

//   const pageSize = 9;

//   useEffect(() => {
//     fetchHighlights(currentPage);
//   }, [currentPage]);

//   const fetchHighlights = async (page: number) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await apiClient.highlights.findAll({
//         page: page,
//         size: pageSize,
//       });
//       const data = response as PageHighlightDto;

//       // Filter highlights with video URLs and sort by creation date
//       const filteredHighlights: HighlightDto[] = data?.content
//         ? data.content
//             .filter((highlight: HighlightDto) => highlight.videoUrl)
//             .sort((a: HighlightDto, b: HighlightDto) => {
//               const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
//               const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
//               return dateB.getTime() - dateA.getTime();
//             })
//         : [];

//       setHighlights(filteredHighlights);
//       setTotalPages(data?.totalPages || 0);
//       setTotalElements(data?.totalElements || 0);
//     } catch (err) {
//       setError("Une erreur est survenue lors du chargement des points forts.");
//       console.error("Error fetching highlights:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   if (loading) {
//     return <HighlightsSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
//           <h3 className="text-red-800 font-semibold mb-2">Erreur</h3>
//           <p className="text-red-600">{error}</p>
//           <button
//             onClick={() => fetchHighlights(currentPage)}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//           >
//             Réessayer
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (highlights.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <div className="max-w-md mx-auto">
//           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg
//               className="w-10 h-10 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900 mb-2">
//             Aucun point fort disponible
//           </h3>
//           <p className="text-gray-600">
//             Il ny a actuellement aucun point fort avec des vidéos à afficher.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Points forts</h1>
//         <p className="text-gray-600">
//           {totalElements} {totalElements === 1 ? "point fort" : "points forts"}
//           {totalElements > 0 && ` • Page ${currentPage + 1} sur ${totalPages}`}
//         </p>
//       </div>

//       <HighlightsGrid highlights={highlights} />

//       {totalPages > 1 && (
//         <div className="mt-12 flex items-center justify-center space-x-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 0}
//             className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//               currentPage === 0
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//             }`}
//           >
//             <ChevronLeft className="h-4 w-4 mr-1" />
//             Précédent
//           </button>

//           <div className="flex items-center space-x-1">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => handlePageChange(i)}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   i === currentPage
//                     ? "bg-blue-600 text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages - 1}
//             className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//               currentPage === totalPages - 1
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
//             }`}
//           >
//             Suivant
//             <ChevronRightIcon className="h-4 w-4 ml-1" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
