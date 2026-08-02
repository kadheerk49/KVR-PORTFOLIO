import type { ReactNode } from 'react';
import SpecularButton from './SpecularButton';

interface ContactButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function ContactButton({ href, children, className = '' }: ContactButtonProps) {
  return (
    <SpecularButton
      href={href}
      size="md"
      radius={24}
      tint="#ffffff"
      tintOpacity={0.12}
      blur={12}
      textColor="#ffffff"
      lineColor="#38BDF8"
      baseColor="#1e293b"
      intensity={1.4}
      shineSize={20}
      shineFade={35}
      thickness={1.5}
      speed={0.4}
      followMouse={true}
      autoAnimate={true}
      className={className}
    >
      {children}
    </SpecularButton>
  );
}