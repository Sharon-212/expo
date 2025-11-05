import { Database, RefreshCw, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDevToolsConnectionContext } from '@/hooks/useDevToolsConnection';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  onDatabaseSelected: (data: Uint8Array, name: string, path: string) => void;
  loading?: boolean;
}

export function FileUpload({ onFileSelected, onDatabaseSelected, loading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [databases, setDatabases] = useState<{ name: string; path: string }[]>([]);
  const [loadingDatabases, setLoadingDatabases] = useState(false);
  const { isConnected, listDatabases } = useDevToolsConnectionContext();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.name.endsWith('.sql') ||
        file.name.endsWith('.db') ||
        file.name.endsWith('.sqlite') ||
        file.name.endsWith('.sqlite3')
      ) {
        onFileSelected(file);
      } else {
        toast.error('Please upload a SQL dump file (.sql) or SQLite database file');
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelected(file);
    }
  };

  const loadDatabaseList = async () => {
    try {
      setLoadingDatabases(true);
      const dbs = await listDatabases();
      setDatabases(dbs);
    } catch (err: any) {
      toast.error(`Failed to load databases: ${err.message}`);
    } finally {
      setLoadingDatabases(false);
    }
  };

  const handleDatabaseSelect = (dbName: string, dbPath: string) => {
    onDatabaseSelected(new Uint8Array(), dbName, dbPath);
  };

  useEffect(() => {
    if (isConnected) {
      loadDatabaseList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">SQLite Database Inspector</CardTitle>
          <CardDescription className="text-base">
            Upload a database file or connect to your app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="devtools" disabled={!isConnected}>
                From App {isConnected && '✓'}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`
                  flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors
                  ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
                  ${loading ? 'opacity-50 pointer-events-none' : ''}
                `}>
                {loading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Loading database...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <Button asChild className="mb-3">
                      <label htmlFor="file-input" className="cursor-pointer">
                        Choose File
                        <input
                          id="file-input"
                          type="file"
                          accept=".sql,.db,.sqlite,.sqlite3"
                          onChange={handleFileInput}
                          className="hidden"
                        />
                      </label>
                    </Button>
                    <p className="text-sm text-muted-foreground mb-2">
                      or drag and drop a .sql, .db, .sqlite, or .sqlite3 file here
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      Supports both binary SQLite files and SQL dump files
                    </p>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="devtools">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Available Databases</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadDatabaseList}
                    disabled={loadingDatabases}>
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${loadingDatabases ? 'animate-spin' : ''}`}
                    />
                    Refresh
                  </Button>
                </div>
                {loadingDatabases ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                ) : databases.length === 0 ? (
                  <div className="text-center p-12 rounded-lg border-2 border-dashed border-muted-foreground/25">
                    <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      No databases found. Make sure your app is using useSQLiteDevTool.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {databases.map((db) => (
                      <Button
                        key={db.path}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDatabaseSelect(db.name, db.path)}>
                        <Database className="h-4 w-4 mr-2" />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{db.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
