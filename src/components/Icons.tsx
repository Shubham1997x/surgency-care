import {
  Stethoscope as IconStethoscope,
  Scissors as IconScalpel,
  Heart as IconHeart,
  Shield as IconShield,
  Building2 as IconHospital,
  Eye as IconEye,
  Users as IconUsers,
  Clock as IconClock,
  Award as IconAward,
  Phone as IconPhone,
  MessageCircle as IconChat,
  ArrowRight as IconArrow,
  Search as IconSearch,
  Filter as IconFilter,
  Calendar as IconCalendar,
  Bed as IconBed,
  Check as IconCheck,
  Star as IconStar,
  MapPin as IconMapPin,
  LucideProps
} from "lucide-react";

export {
  IconStethoscope,
  IconScalpel,
  IconHeart,
  IconShield,
  IconHospital,
  IconEye,
  IconUsers,
  IconClock,
  IconAward,
  IconPhone,
  IconChat,
  IconArrow,
  IconSearch,
  IconFilter,
  IconCalendar,
  IconBed,
  IconCheck,
  IconStar,
  IconMapPin
};

const map = {
  stethoscope: IconStethoscope,
  scalpel: IconScalpel,
  heart: IconHeart,
  shield: IconShield,
  hospital: IconHospital,
  eye: IconEye,
  users: IconUsers,
  clock: IconClock,
  award: IconAward,
};

export type IconName = keyof typeof map;

export function Icon({ name, ...rest }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? IconStethoscope;
  return <Cmp {...rest} />;
}
