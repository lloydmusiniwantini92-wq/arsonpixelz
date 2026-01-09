import Architect from '../assets/testimonials/architect.png';
import Pilot from '../assets/testimonials/pilot.png';
import Engineer from '../assets/testimonials/engineer.png';
import Artist from '../assets/testimonials/artist.png';
import Broker from '../assets/testimonials/broker.png';

export interface Testimonial {
    id: string;
    alias: string;
    role: string;
    location: string;
    transmission: string;
    image: string;
    tags: string[];
}

export const testimonials: Testimonial[] = [
    {
        id: 'trans-01',
        alias: 'KAELTHAS',
        role: 'VOID ARCHITECT',
        location: 'SECTOR 04',
        transmission: "Arson Pixelz didn't just build a brand; they constructed a digital religion. The 'Construct' framework rewired our entire aquisition channel. Revenue has gone kinetic.",
        image: Architect,
        tags: ['BRAND IGNITION', 'SYSTEMS ARCHITECTURE']
    },
    {
        id: 'trans-02',
        alias: 'NYX S-7',
        role: 'NAVIGATOR PILOT',
        location: 'ORBITAL STATION',
        transmission: "Their visual language speaks a dialect of power. We deployed the 'Thanoic' interface across our fleet, and user compliance jumped 400%. It's not design; it's psychological warfare.",
        image: Pilot,
        tags: ['UI/UX', 'CONTROL SYSTEMS']
    },
    {
        id: 'trans-03',
        alias: 'UNIT 734',
        role: 'QUANTUM ENGINEER',
        location: 'RESEARCH FACILITY',
        transmission: "Precision. Velocity. Impact. We needed a platform that could handle petabytes of data without breaking the aesthetic immersion. Arson delivered a masterpiece of optimization.",
        image: Engineer,
        tags: ['DEVELOPMENT', 'OPTIMIZATION']
    },
    {
        id: 'trans-04',
        alias: 'VEX',
        role: 'DIGITAL ARTISAN',
        location: 'NEON DISTRICT',
        transmission: "I've seen code, and I've seen art. What Arson Pixelz does is synthesis. They took our chaotic creative energy and channeled it into a laser-focused conversion engine.",
        image: Artist,
        tags: ['CREATIVE DIRECTION', 'CONVERSION']
    },
    {
        id: 'trans-05',
        alias: 'ZERO',
        role: 'DATA BROKER',
        location: 'DEEP WEB',
        transmission: "In the underground, reputation is currency. The identity system Arson forged for us is untouchable. We don't just exist in the market; we haunt it.",
        image: Broker,
        tags: ['BRANDING', 'IDENTITY']
    }
];
