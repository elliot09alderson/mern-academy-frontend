import React, { useState } from 'react';
import { AlertTriangle, Plus, Trash2, Eye, EyeOff, Edit2, Check, X, Loader2 } from 'lucide-react';
import { useGetOffersQuery, useCreateOfferMutation, useUpdateOfferMutation, useDeleteOfferMutation, useToggleOfferStatusMutation } from '@/store/api/offerApi';
import { useToast } from '@/hooks/use-toast';

const Offers = () => {
  const { toast } = useToast();
  const { data: offersData, isLoading } = useGetOffersQuery({});
  const [createOffer, { isLoading: isCreating }] = useCreateOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();
  const [deleteOffer] = useDeleteOfferMutation();
  const [toggleStatus] = useToggleOfferStatusMutation();

  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const offers = offersData?.data ?? [];

  const handleCreate = async () => {
    if (!newText.trim()) return;
    try {
      await createOffer({ text: newText.trim(), isActive: true, order: offers.length }).unwrap();
      setNewText('');
      toast({ title: 'Offer created' });
    } catch {
      toast({ title: 'Failed to create offer', variant: 'destructive' });
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingText.trim()) return;
    try {
      await updateOffer({ id, text: editingText.trim() }).unwrap();
      setEditingId(null);
      toast({ title: 'Offer updated' });
    } catch {
      toast({ title: 'Failed to update offer', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this offer?')) return;
    try {
      await deleteOffer(id).unwrap();
      toast({ title: 'Offer deleted' });
    } catch {
      toast({ title: 'Failed to delete offer', variant: 'destructive' });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
    } catch {
      toast({ title: 'Failed to toggle status', variant: 'destructive' });
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="h-5 w-5 text-orange-500" />
        <h1 className="text-2xl font-bold text-gray-800">Announcement Offers</h1>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        Manage the scrolling offers shown in the announcement bar. Active offers appear in the marquee on the website.
      </p>

      {/* Add new */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="font-semibold text-gray-700 mb-4">Add New Offer</h2>
        <div className="flex gap-3">
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="e.g. Diwali Special — 10% Off + Free Placement Support"
            className="flex-1 border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
          />
          <button
            onClick={handleCreate}
            disabled={isCreating || !newText.trim()}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-5 py-2.5 rounded text-sm font-medium transition-colors"
          >
            {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add
          </button>
        </div>
      </div>

      {/* Offer list */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">All Offers</h2>
          <span className="text-xs text-gray-400">{offers.length} total · {offers.filter(o => o.isActive).length} active</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-orange-400" />
          </div>
        ) : offers.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No offers yet. Add one above.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {offers.map((offer) => (
              <li key={offer._id} className="px-6 py-4 flex items-center gap-4">
                <AlertTriangle className={`h-4 w-4 flex-shrink-0 ${offer.isActive ? 'text-orange-500' : 'text-gray-300'}`} />

                <div className="flex-1 min-w-0">
                  {editingId === offer._id ? (
                    <input
                      autoFocus
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdate(offer._id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="w-full border border-orange-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
                    />
                  ) : (
                    <p className={`text-sm truncate ${offer.isActive ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                      {offer.text}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {editingId === offer._id ? (
                    <>
                      <button onClick={() => handleUpdate(offer._id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 text-gray-400 hover:bg-gray-50 rounded transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleToggle(offer._id)}
                        className={`p-1.5 rounded transition-colors ${offer.isActive ? 'text-orange-500 hover:bg-orange-50' : 'text-gray-400 hover:bg-gray-50'}`}
                        title={offer.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {offer.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => { setEditingId(offer._id); setEditingText(offer.text); }}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(offer._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Offers;
