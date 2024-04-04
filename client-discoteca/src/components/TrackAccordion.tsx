import { Accordion, AccordionItem, Avatar, Button, Spacer } from '@nextui-org/react'
import { Track } from '../types'
import {  AiOutlineEdit } from "react-icons/ai";
import { TrackDeleteButton } from './TrackDeleteButton/index';
type TrackAccordionProps = {
    tracks: Track[];
    onDeleteTrack: (trackId : string) => void;
}

function TrackAccordion({ tracks, onDeleteTrack }: TrackAccordionProps) {


    return (
        <div>
            <Accordion variant='light' className='my-0' selectionMode="multiple">
                {tracks.map((track, index) => (
                    <AccordionItem
                        key={track.id}
                        aria-label={track.name}
                        startContent={
                            <div className="flex items-center">
                                <span className="ml-3" style={{ color: '#000' }}>{index}</span>
                                <Spacer x={4} />
                                <Avatar
                                    color="secondary"
                                    radius="lg"
                                    src={`${import.meta.env.VITE_API_URL}/${track.cover_url}`}
                                />
                            </div>
                        }
                        subtitle={track.duration}
                        title={track.name}
                    >
                        <div className="ml-3 flex gap-4 items-center">
                            <Button className='text-white' size='md' color="success" startContent={<AiOutlineEdit />}>
                                Editar música
                            </Button>
                            <TrackDeleteButton trackId={track.id} trackName={track.name} onDeleteTrack={onDeleteTrack} />
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default TrackAccordion
