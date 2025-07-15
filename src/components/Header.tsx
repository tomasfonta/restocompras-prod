
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, User, Settings, LogOut, Moon, Sun, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { setLanguage, t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-2 sm:py-4 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base sm:text-lg">R</span>
            </div>
            <div>
              <h1 className="text-base sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                RestoCompras
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{currentUser.companyName}</p>
            </div>

          </div>
          <Badge
            variant="default"
            className={`${currentUser.userType === 'supplier' ? "bg-primary" : "bg-green-500"} text-white shadow-lg`}
          >
            {currentUser.userType === 'supplier' ? t('header.supplier') : t('header.restaurant')}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg" align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className="hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')} className="hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100">
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                <User className="w-4 h-4 mr-2" />
                {currentUser.companyName}
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg" align="end">
              <DropdownMenuItem onClick={handleProfileClick} className="hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100">
                <User className="w-4 h-4 mr-2" /> 
                {t('header.myProfile')}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100">
                <Settings className="w-4 h-4 mr-2" />
                {t('header.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('header.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
