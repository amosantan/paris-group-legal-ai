import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Bookmark, BookmarkCheck, Book, Search, Filter, Save, Clock, Trash2, Edit2, Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"]);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ar">("en");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [bookmarkNotes, setBookmarkNotes] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [editingSearchId, setEditingSearchId] = useState<number | null>(null);
  const [editingSearchName, setEditingSearchName] = useState("");

  const utils = trpc.useUtils();
  
  const { data: searchResults, isLoading: searchLoading } = trpc.knowledgeBase.search.useQuery({
    query: searchQuery || undefined,
    categories: selectedCategories.includes("all") ? undefined : selectedCategories,
    language: selectedLanguage,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  const { data: categories } = trpc.knowledgeBase.getCategories.useQuery();
  const { data: bookmarks } = trpc.bookmarks.list.useQuery();
  const { data: savedSearches } = trpc.savedSearches.list.useQuery();

  const bookmarkMutation = trpc.bookmarks.create.useMutation({
    onSuccess: () => {
      utils.bookmarks.list.invalidate();
      toast.success("Article bookmarked successfully");
      setBookmarkNotes("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeBookmarkMutation = trpc.bookmarks.delete.useMutation({
    onSuccess: () => {
      utils.bookmarks.list.invalidate();
      toast.success("Bookmark removed");
    },
  });

  const saveSearchMutation = trpc.savedSearches.create.useMutation({
    onSuccess: () => {
      utils.savedSearches.list.invalidate();
      toast.success("Search saved successfully");
      setSaveSearchName("");
      setShowSaveDialog(false);
    },
    onError: (error) => {
      toast.error("Failed to save search: " + error.message);
    },
  });

  const deleteSavedSearchMutation = trpc.savedSearches.delete.useMutation({
    onSuccess: () => {
      utils.savedSearches.list.invalidate();
      toast.success("Saved search deleted");
    },
  });

  const renameSavedSearchMutation = trpc.savedSearches.rename.useMutation({
    onSuccess: () => {
      utils.savedSearches.list.invalidate();
      toast.success("Search renamed");
      setEditingSearchId(null);
    },
  });

  const updateLastUsedMutation = trpc.savedSearches.updateLastUsed.useMutation({
    onSuccess: () => {
      utils.savedSearches.list.invalidate();
    },
  });

  const handleBookmark = (articleId: string) => {
    bookmarkMutation.mutate({
      articleId,
      notes: bookmarkNotes || undefined,
    });
  };

  const handleRemoveBookmark = (bookmarkId: number) => {
    removeBookmarkMutation.mutate({ id: bookmarkId });
  };

  const handleSaveSearch = () => {
    if (!saveSearchName.trim()) {
      toast.error("Please enter a name for this search");
      return;
    }

    saveSearchMutation.mutate({
      name: saveSearchName,
      query: searchQuery || undefined,
      categories: selectedCategories.includes("all") ? undefined : selectedCategories,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      language: selectedLanguage,
    });
  };

  const handleLoadSavedSearch = (search: any) => {
    setSearchQuery(search.query || "");
    setSelectedCategories(search.categories && search.categories.length > 0 ? search.categories : ["all"]);
    setDateFrom(search.dateFrom || "");
    setDateTo(search.dateTo || "");
    setSelectedLanguage(search.language || "en");
    
    // Update last used timestamp
    updateLastUsedMutation.mutate({ id: search.id });
    
    toast.success(`Loaded search: ${search.name}`);
  };

  const handleDeleteSavedSearch = (id: number) => {
    deleteSavedSearchMutation.mutate({ id });
  };

  const handleRenameSearch = (id: number) => {
    if (!editingSearchName.trim()) {
      toast.error("Search name cannot be empty");
      return;
    }
    renameSavedSearchMutation.mutate({ id, name: editingSearchName });
  };

  const handleCategoryToggle = (category: string) => {
    if (category === "all") {
      setSelectedCategories(["all"]);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories.filter(c => c !== "all"), category];
      
      setSelectedCategories(newCategories.length === 0 ? ["all"] : newCategories);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories(["all"]);
    setDateFrom("");
    setDateTo("");
  };

  const isArticleBookmarked = (articleId: string) => {
    return bookmarks?.some(b => b.articleId === articleId);
  };

  const getBookmarkId = (articleId: string) => {
    return bookmarks?.find(b => b.articleId === articleId)?.id;
  };

  const getArticleId = (article: any) => {
    return `${article.lawNumber}-${article.articleNumber || 'general'}`;
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      rental_law: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      civil_code: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      escrow_law: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      strata_law: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      procedures: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      rental_law: "Rental Law",
      civil_code: "Civil Code",
      escrow_law: "Escrow Law",
      strata_law: "Strata Law",
      procedures: "Procedures",
    };
    return labels[category] || category;
  };

  const hasActiveFilters = searchQuery || !selectedCategories.includes("all") || dateFrom || dateTo;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Legal Knowledge Base</h1>
            <p className="text-muted-foreground mt-2">
              Browse and search UAE/Dubai laws and regulations
            </p>
          </div>
          {savedSearches && savedSearches.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Saved Searches ({savedSearches.length})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Quick Access</h4>
                  <Separator />
                  {savedSearches.map((search) => (
                    <div key={search.id} className="flex items-center justify-between gap-2 p-2 hover:bg-accent rounded-lg">
                      {editingSearchId === search.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editingSearchName}
                            onChange={(e) => setEditingSearchName(e.target.value)}
                            className="h-8"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRenameSearch(search.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingSearchId(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleLoadSavedSearch(search)}
                            className="flex-1 text-left text-sm hover:underline"
                          >
                            {search.name}
                          </button>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingSearchId(search.id);
                                setEditingSearchName(search.name);
                              }}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteSavedSearch(search.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <Tabs defaultValue="search" className="space-y-4">
          <TabsList>
            <TabsTrigger value="search">
              <Search className="h-4 w-4 mr-2" />
              Search & Browse
            </TabsTrigger>
            <TabsTrigger value="bookmarks">
              <BookmarkCheck className="h-4 w-4 mr-2" />
              My Bookmarks ({bookmarks?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Search Legal Articles</CardTitle>
                    <CardDescription>
                      Find specific laws, articles, and regulations
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {hasActiveFilters && (
                      <>
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          Clear Filters
                        </Button>
                        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Save className="h-4 w-4 mr-2" />
                              Save Search
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Save Search Query</DialogTitle>
                              <DialogDescription>
                                Give this search a name for quick access later
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                placeholder="e.g., Rental disputes 2007-2010"
                                value={saveSearchName}
                                onChange={(e) => setSaveSearchName(e.target.value)}
                              />
                              <Button
                                onClick={handleSaveSearch}
                                disabled={saveSearchMutation.isPending}
                                className="w-full"
                              >
                                Save Search
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by keyword, law number, or article..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={selectedLanguage} onValueChange={(val) => setSelectedLanguage(val as "en" | "ar")}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {showAdvancedFilters && (
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Categories</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="cat-all"
                            checked={selectedCategories.includes("all")}
                            onCheckedChange={() => handleCategoryToggle("all")}
                          />
                          <label htmlFor="cat-all" className="text-sm cursor-pointer">
                            All Categories
                          </label>
                        </div>
                        {categories?.filter(c => c.value !== "all").map((cat) => (
                          <div key={cat.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${cat.value}`}
                              checked={selectedCategories.includes(cat.value)}
                              onCheckedChange={() => handleCategoryToggle(cat.value)}
                              disabled={selectedCategories.includes("all")}
                            />
                            <label htmlFor={`cat-${cat.value}`} className="text-sm cursor-pointer">
                              {cat.label} ({cat.count})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Date Range (Law Enactment Year)</Label>
                      <div className="flex gap-4 items-center">
                        <div className="flex-1">
                          <Label htmlFor="date-from" className="text-xs text-muted-foreground">From Year</Label>
                          <Input
                            id="date-from"
                            type="number"
                            placeholder="e.g., 2000"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            min="1900"
                            max="2100"
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="date-to" className="text-xs text-muted-foreground">To Year</Label>
                          <Input
                            id="date-to"
                            type="number"
                            placeholder="e.g., 2024"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            min="1900"
                            max="2100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {searchResults?.length || 0} results
                    </Badge>
                    {searchQuery && (
                      <Badge variant="outline">
                        Query: "{searchQuery}"
                      </Badge>
                    )}
                    {!selectedCategories.includes("all") && (
                      <Badge variant="outline">
                        Categories: {selectedCategories.map(c => getCategoryLabel(c)).join(", ")}
                      </Badge>
                    )}
                    {(dateFrom || dateTo) && (
                      <Badge variant="outline">
                        Years: {dateFrom || "any"} - {dateTo || "any"}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {searchLoading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Loading...</p>
                  </CardContent>
                </Card>
              ) : searchResults && searchResults.length > 0 ? (
                searchResults.map((article: any) => {
                  const articleId = getArticleId(article);
                  const bookmarked = isArticleBookmarked(articleId);
                  const bookmarkId = getBookmarkId(articleId);

                  return (
                    <Card key={articleId}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getCategoryBadgeColor(article.category)}>
                                {getCategoryLabel(article.category)}
                              </Badge>
                              <Badge variant="outline">
                                {article.lawNumber}
                                {article.articleNumber && ` - Article ${article.articleNumber}`}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl">
                              {selectedLanguage === "en" ? article.titleEn : (article.titleAr || article.titleEn)}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {article.lawName}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            {bookmarked ? (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => bookmarkId && handleRemoveBookmark(bookmarkId)}
                              >
                                <BookmarkCheck className="h-4 w-4 mr-2" />
                                Bookmarked
                              </Button>
                            ) : (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Bookmark className="h-4 w-4 mr-2" />
                                    Bookmark
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Bookmark Article</DialogTitle>
                                    <DialogDescription>
                                      Add personal notes to this bookmark (optional)
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Textarea
                                      placeholder="Add notes about this article..."
                                      value={bookmarkNotes}
                                      onChange={(e) => setBookmarkNotes(e.target.value)}
                                      rows={4}
                                    />
                                    <Button
                                      onClick={() => handleBookmark(articleId)}
                                      disabled={bookmarkMutation.isPending}
                                      className="w-full"
                                    >
                                      Save Bookmark
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedArticle(article)}
                            >
                              <Book className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {selectedLanguage === "en" ? article.contentEn : (article.contentAr || article.contentEn)}
                        </p>
                        {article.keywords && article.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {article.keywords.slice(0, 5).map((keyword: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                      {hasActiveFilters ? "Try different search terms or filters" : "Start searching to find legal articles"}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-4">
            {bookmarks && bookmarks.length > 0 ? (
              <div className="grid gap-4">
                {bookmarks.map((bookmark) => {
                  // Find the article from search results
                  const article = searchResults?.find((a: any) => getArticleId(a) === bookmark.articleId);
                  
                  if (!article) return null;

                  return (
                    <Card key={bookmark.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getCategoryBadgeColor(article.category)}>
                                {getCategoryLabel(article.category)}
                              </Badge>
                              <Badge variant="outline">
                                {article.lawNumber}
                                {article.articleNumber && ` - Article ${article.articleNumber}`}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl">{article.titleEn}</CardTitle>
                            <CardDescription className="mt-1">{article.lawName}</CardDescription>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveBookmark(bookmark.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {article.contentEn}
                        </p>
                        {bookmark.notes && (
                          <>
                            <Separator className="my-4" />
                            <div>
                              <p className="text-sm font-medium mb-2">My Notes:</p>
                              <p className="text-sm text-muted-foreground">{bookmark.notes}</p>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookmarkCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                  <p className="text-muted-foreground">
                    Bookmark articles from the search tab to save them for quick access
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Article Detail Dialog */}
        {selectedArticle && (
          <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getCategoryBadgeColor(selectedArticle.category)}>
                    {getCategoryLabel(selectedArticle.category)}
                  </Badge>
                  <Badge variant="outline">
                    {selectedArticle.lawNumber}
                    {selectedArticle.articleNumber && ` - Article ${selectedArticle.articleNumber}`}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl">{selectedArticle.titleEn}</DialogTitle>
                <DialogDescription>{selectedArticle.lawName}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">English</h4>
                  <p className="text-sm whitespace-pre-wrap">{selectedArticle.contentEn}</p>
                </div>
                {selectedArticle.contentAr && (
                  <>
                    <Separator />
                    <div dir="rtl">
                      <h4 className="font-semibold mb-2">العربية</h4>
                      <p className="text-sm whitespace-pre-wrap">{selectedArticle.contentAr}</p>
                    </div>
                  </>
                )}
                {selectedArticle.practicalExample && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Practical Example</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {selectedArticle.practicalExample}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
