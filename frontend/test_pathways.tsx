import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, ArrowRight, BookOpen, ChevronRight, Briefcase, Filter, TrendingUp, Sparkles, AlertCircle, Building, Wrench, HeartPulse, Layers, Target, Trophy, Building2, ClipboardList, Users, CheckCircle, Target as TargetIcon, PiggyBank, SearchX, MousePointerClick, Activity, Bookmark, MessageCircle, Star, Microscope, Palette, HardHat, Leaf, Rocket } from 'lucide-react';
import { getPathwayTree, getPathwayStats, getStreamDetails, getExamSchedule, searchPathways, EducationLevelData, PathwayStats, StreamData, CourseData, ExamScheduleData } from '../api/pathwayApi';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import PathwayTree from './PathwayTree';
import CourseComparisonModal from './CourseComparisonModal';

const PathwaysExplorer: React.FC = () => {
  const [educationLevels, setEducationLevels] = useState<EducationLevelData[]>([]);
  const [stats, setStats] = useState<PathwayStats | null>(null);
  const [globalStats, setGlobalStats] = useState<PathwayStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelSlug, pathwaySlug, streamSlug, comboSlug } = useParams();
  
  const activeLevelSlug = levelSlug || searchParams.get('level') || 'after-10th';
  
  // Try to match slugs to ids for the tree data, since the tree returns populated nested objects
  const [streamDetails, setStreamDetails] = useState<StreamData | null>(null);
  const [loadingStream, setLoadingStream] = useState(false);
  
  const [examSchedules, setExamSchedules] = useState<ExamScheduleData[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  
  // Comparison State
  const [selectedCourses, setSelectedCourses] = useState<CourseData[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    duration: 'Any',
    courseType: 'Any',
    eligibility: 'Any'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const setActiveLevel = (level: string) => {
    navigate(`/pathways/${level}`);
  };

  const navigatePathway = (pathway: string | null) => {
    if (pathway) {
      navigate(`/pathways/${activeLevelSlug}/${pathway}`);
    } else {
      navigate(`/pathways/${activeLevelSlug}`);
    }
  };

  const navigateStream = (stream: string | null) => {
    if (stream) {
      navigate(`/pathways/${activeLevelSlug}/${pathwaySlug}/${stream}`);
    } else {
      navigate(`/pathways/${activeLevelSlug}/${pathwaySlug}`);
    }
  };

  const navigateCombo = (combo: string | null) => {
    if (combo) {
      navigate(`/pathways/${activeLevelSlug}/${pathwaySlug}/${streamSlug}/${combo}`);
    } else {
      navigate(`/pathways/${activeLevelSlug}/${pathwaySlug}/${streamSlug}`);
    }
  };

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [treeData, globalStatsData] = await Promise.all([
          getPathwayTree(),
          getPathwayStats()
        ]);
        setEducationLevels(treeData || []);
        setGlobalStats(globalStatsData || null);
      } catch (error) {
        console.error("Failed to fetch global pathways data", error);
      }
    };
    fetchGlobalData();
  }, []);

  useEffect(() => {
    const fetchLevelData = async () => {
      setLoading(true);
      try {
        const levelStatsData = await getPathwayStats(activeLevelSlug);
        setStats(levelStatsData);
      } catch (error) {
        console.error("Failed to fetch level stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLevelData();
  }, [activeLevelSlug]);

  useEffect(() => {
    if (streamSlug) {
      setLoadingStream(true);
      setLoadingSchedules(true);
      getStreamDetails(streamSlug).then(data => {
        setStreamDetails(data);
        setLoadingStream(false);
        if (data && data._id) {
          getExamSchedule(data._id).then(schedules => {
            setExamSchedules(schedules);
            setLoadingSchedules(false);
          }).catch(err => {
            console.error(err);
            setLoadingSchedules(false);
          });
        } else {
          setLoadingSchedules(false);
        }
      }).catch(err => {
        console.error(err);
        setLoadingStream(false);
        setLoadingSchedules(false);
      });
    } else {
      setStreamDetails(null);
      setExamSchedules([]);
    }
  }, [streamSlug]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const results = await searchPathways(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

  
  return ( <div>Stub</div> );
};
export default PathwaysExplorer;
